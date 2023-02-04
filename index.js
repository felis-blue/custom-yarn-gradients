let segment_count_field, thread_count_field;

window.onload = () => {
    segment_count_field = document.getElementById('yarn-length');
    segment_count_field.onchange = updateAll;
    thread_count_field = document.getElementById('thread-count');
    thread_count_field.onchange = updateAll;

    populateColors();
    updateAll();
}

function populateColors() {
    let template_div = document.getElementById('color-templates');
    let template = document.querySelector('.color-template');
    template.onclick = handleTemplateClick;
    let stylesheet = document.getElementById('styles').sheet;

    for (let [color_name, [hex_code, text_color]] of colors) {
        let new_template = template.cloneNode();
        new_template.dataset.color = color_name;
        new_template.classList.add(text_color);
        new_template.innerText = color_name;
        new_template.onclick = handleTemplateClick;
        template_div.insertBefore(new_template, template);

        let new_rule = `[data-color="${color_name}"] {--color: ${hex_code};}`
        stylesheet.insertRule(new_rule);
    }
}

function updateAll() {
    let segment_count = parseInt(segment_count_field.value);
    let thread_count = parseInt(thread_count_field.value);

    if (!(segment_count && thread_count)) {
        return;
    }

    let weight = Math.floor(segment_count * thread_count * 5 / 15) * 10;
    document.getElementById('yarn-weight').innerText = `${weight}g`;

    let color_div = document.getElementById('yarn-colors');
    color_div.replaceChildren();
    for (let segment = 0; segment < segment_count; segment++) {
        for (let thread = 0; thread < thread_count; thread++) {
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
    let segment_count = parseInt(segment_count_field.value);
    let thread_count = parseInt(thread_count_field.value);

    if (!(segment_count && thread_count)) {
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
    let rows_total = segment_count * row_repeats;
    let height = rows_total * template_height + (rows_total - 1) * template_spacing_height;
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    let group = document.getElementById('path-group');
    group.replaceChildren();

    for (let segment = 0; segment < segment_count; segment++) {
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