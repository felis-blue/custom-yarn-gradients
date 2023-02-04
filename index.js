let yarn_length_field, thread_number_field, weight_text, template_div, color_div, pattern_div;

window.onload = () => {
    yarn_length_field = document.getElementById('yarn-length');
    thread_number_field = document.getElementById('thread-number');
    weight_text = document.getElementById('yarn-weight');
    template_div = document.getElementById('color-templates');
    color_div = document.getElementById('yarn-colors');
    pattern_div = document.getElementById('pattern');

    populateColors();
    updateAll();
}

function populateColors() {
    let template = document.querySelector('.template');
    let stylesheet = document.getElementById('styles').sheet;

    for (let [color_name, [hex_code, text_color]] of colors) {
        let new_template = template.cloneNode();
        new_template.dataset.color = color_name;
        let name_div = document.createElement('div');
        name_div.classList.add(text_color);
        name_div.innerText = color_name;

        new_template.appendChild(name_div);
        template_div.insertBefore(new_template, template);

        let new_rule = `[data-color="${color_name}"] {--color: ${hex_code};}`
        stylesheet.insertRule(new_rule);
    }
}

function updateAll() {
    let yarn_length = yarn_length_field.value;
    let thread_number = thread_number_field.value;

    if (!(yarn_length && thread_number)) {
        return;
    }

    let weight = Math.floor(yarn_length * thread_number * 5 / 15) * 10;
    weight_text.innerText = `${weight}g`;

    color_div.replaceChildren();
    for (let segment = 0; segment < yarn_length; segment++) {
        for (let thread = 0; thread < thread_number; thread++) {
            let color_part = document.createElement('div');
            color_part.classList.add('color', 'color-part');
            color_part.dataset.segment = segment;
            color_part.dataset.row = thread;
            color_part.onclick = handleColorPartClick;

            color_div.append(color_part);
        }
    }

    createPattern();
}

function handleTemplateClick(target) {
    color = target.dataset.color;

    let focused_color_parts = document.querySelectorAll('.color-part.focus');
    for (let part of focused_color_parts) {
        if (color) {
            part.dataset.color = color;
        } else {
            delete part.dataset.color;
        }
        part.classList.toggle('focus');
    }

    createPattern();
}

function createPattern() {
    pattern_div.replaceChildren();

    let segments_count = parseInt(yarn_length_field.value);
    let thread_count = parseInt(thread_number_field.value);

    if (!(segments_count && thread_count)) {
        return;
    }

    let row_repeats = 3;
    let colunm_repeats = 85;
    let template_width = 210;
    let template_height = 165;
    let template_spacing_width = 10;
    let template_spacing_height = -50;

    let color_map = getColorMap();

    let svg = document.getElementById('svg').cloneNode();
    svg.removeAttribute('id');

    let width = colunm_repeats * template_width + (colunm_repeats - 1) * template_spacing_width;
    let rows_total = segments_count * row_repeats;
    let height = rows_total * template_height + (rows_total - 1) * template_spacing_height;
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    let templates = {};
    templates[[3, 0]] = document.getElementById('path-3-1').cloneNode();
    templates[[3, 0]].removeAttribute('id');
    templates[[3, 1]] = document.getElementById('path-3-2').cloneNode();
    templates[[3, 1]].removeAttribute('id');
    templates[[3, 2]] = document.getElementById('path-3-3').cloneNode();
    templates[[3, 2]].removeAttribute('id');

    templates[[4, 0]] = document.getElementById('path-4-1').cloneNode();
    templates[[4, 0]].removeAttribute('id');
    templates[[4, 1]] = document.getElementById('path-4-2').cloneNode();
    templates[[4, 1]].removeAttribute('id');
    templates[[4, 2]] = document.getElementById('path-4-3').cloneNode();
    templates[[4, 2]].removeAttribute('id');
    templates[[4, 3]] = document.getElementById('path-4-4').cloneNode();
    templates[[4, 3]].removeAttribute('id');

    templates[[5, 0]] = document.getElementById('path-5-1').cloneNode();
    templates[[5, 0]].removeAttribute('id');
    templates[[5, 1]] = document.getElementById('path-5-2').cloneNode();
    templates[[5, 1]].removeAttribute('id');
    templates[[5, 2]] = document.getElementById('path-5-3').cloneNode();
    templates[[5, 2]].removeAttribute('id');
    templates[[5, 3]] = document.getElementById('path-5-4').cloneNode();
    templates[[5, 3]].removeAttribute('id');
    templates[[5, 4]] = document.getElementById('path-5-5').cloneNode();
    templates[[5, 4]].removeAttribute('id');

    let nested_svg_template = document.getElementById('nested_svg').cloneNode();
    nested_svg_template.removeAttribute('id');

    for (let thread = 0; thread < thread_count; thread++) {
        let path = templates[[thread_count, thread]].cloneNode();
        nested_svg_template.appendChild(path);
    }

    for (let segment = 0; segment < segments_count; segment++) {

        let color_array = color_map[segment];

        for (let j = 0; j < row_repeats; j++) {
            for (let i = 0; i < colunm_repeats; i++) {
                let nested_svg = nested_svg_template.cloneNode(true);

                const shuffled_colors = color_array.sort(() => 0.5 - Math.random());
                for (let [i, path] of nested_svg.childNodes.entries()) {
                    let color = shuffled_colors[i];
                    if (color) {
                        path.setAttribute('fill', colors.get(color)[0]);
                    }
                }

                let x = i * (template_width + template_spacing_width);
                let y = (segment * row_repeats + j) * (template_height + template_spacing_height);
                nested_svg.setAttribute('x', x);
                nested_svg.setAttribute('y', y);

                svg.appendChild(nested_svg);
            }
        }
    }

    pattern_div.append(svg);

    var svg_string = new XMLSerializer().serializeToString(svg);
    var svgBlob = new Blob([svg_string], { type: "image/svg+xml;charset=utf-8" });
    var url = URL.createObjectURL(svgBlob);
    document.getElementById("dowload-link").href = url;
}

function getColorMap() {
    let color_map = [];
    let color_parts = document.querySelectorAll('.color-part');
    for (let part of color_parts) {
        if (!color_map[part.dataset.segment]) {
            color_map[part.dataset.segment] = []
        }
        color_map[part.dataset.segment][part.dataset.row] = part.dataset.color;
    }
    return color_map;
}

function handleColorPartClick(event) {
    let toggle_state = event.target.classList.toggle('focus');

    if (event.shiftKey) {
        let current_row = event.target.dataset.row;
        let color_parts = document.querySelectorAll(`.color-part[data-row="${current_row}"]`);
        for (let part of color_parts) {
            if (part.dataset.color === event.target.dataset.color
                && +part.dataset.segment < +event.target.dataset.segment) {
                part.classList.toggle('focus', toggle_state);
            }
        }
    }
}