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

    for (let [color_name, hex_code] of colors) {
        let new_template = template.cloneNode();
        new_template.dataset.color = color_name;

        template_div.appendChild(new_template);

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

function handleTemplateClick(event) {
    color = event.target.dataset.color;

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

    let color_map = getColorMap();

    let segments_count = yarn_length_field.value;
    let thread_count = thread_number_field.value;

    if (!(segments_count && thread_count)) {
        return;
    }

    let svg = document.getElementById('svg').cloneNode();
    svg.removeAttribute('id');

    let width = segments_count * thread_count * 10;
    let height = Math.floor(width / 18);
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    let path_template = document.getElementById('path')
    for (let segment = 0; segment < segments_count; segment++) {
        for (let i = 0; i < 10; i++) {
            for (let thread = 0; thread < thread_count; thread++) {
                let path = path_template.cloneNode();
                path.removeAttribute('id');

                let color = color_map[[segment, thread]];
                if (color) {
                    path.setAttribute('stroke', colors.get(color));
                }

                let position = (segment * thread_count) * 10 + thread_count * i + thread + .5;
                path.setAttribute('d', `M ${position} 1 l 0 ${height - 2}`);

                svg.appendChild(path);
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
    let color_map = {};
    let color_parts = document.querySelectorAll('.color-part');
    for (let part of color_parts) {
        color_map[[part.dataset.segment, part.dataset.row]] = part.dataset.color;
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