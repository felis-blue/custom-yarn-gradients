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
        new_template.classList.add(text_color);
        new_template.innerText = color_name;
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
            let color_part = document.createElement('button');
            color_part.setAttribute('type', 'button');
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

    let svg = document.getElementById('svg');

    let width = colunm_repeats * template_width + (colunm_repeats - 1) * template_spacing_width;
    let rows_total = segments_count * row_repeats;
    let height = rows_total * template_height + (rows_total - 1) * template_spacing_height;
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    let group = document.getElementById('path-group');
    group.replaceChildren();

    for (let segment = 0; segment < segments_count; segment++) {
        let color_array = color_map[segment];

        for (let j = 0; j < row_repeats; j++) {
            for (let i = 0; i < colunm_repeats; i++) {
                const shuffled_colors = color_array.sort(() => 0.5 - Math.random());

                for (let thread = 0; thread < thread_count; thread++) {
                    let path = document.createElementNS(svg.namespaceURI, 'use');
                    path.setAttribute('href', `#path-${thread_count}-${thread}`);

                    let color = shuffled_colors[thread];
                    if (color) {
                        path.setAttribute('fill', colors.get(color)[0]);
                    }

                    let x = i * (template_width + template_spacing_width);
                    let y = (segment * row_repeats + j) * (template_height + template_spacing_height);
                    path.setAttribute('x', x);
                    path.setAttribute('y', y);

                    group.appendChild(path);
                }
            }
        }
    }

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