let yarn_length_field, thread_number_field, weight_text, color_div, pattern_div;

window.onload = () => {
    yarn_length_field = document.getElementById('yarn-length');
    yarn_length_field.onchange = updateAll;
    thread_number_field = document.getElementById('thread-number');
    thread_number_field.onchange = updateAll;
    weight_text = document.getElementById('yarn-weight');
    color_div = document.getElementById('yarn-colors');
    pattern_div = document.getElementById('pattern');

    let templates = document.querySelectorAll('.template');
    for (let template of templates) {
        template.onclick = handleTemplateClick;
    }

    updateAll();
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
            color_part.onclick = (() => color_part.classList.toggle('focus'));

            color_div.append(color_part);
        }
    }

    createPattern();
}

function handleTemplateClick(event) {
    color = event.target.dataset.color;

    let focused_color_parts = document.querySelectorAll('.color-part.focus');
    for (let part of focused_color_parts) {
        part.dataset.color = color;
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
                path.dataset.color = color;

                let position = (segment * thread_count) * 10 + thread_count * i + thread + .5;
                path.setAttribute('d', `M ${position} 1 l 0 ${height - 2}`);

                svg.appendChild(path);
            }
        }
    }

    pattern_div.append(svg);
}

function getColorMap() {
    let color_map = {};
    let color_parts = document.querySelectorAll('.color-part');
    for (let part of color_parts) {
        color_map[[part.dataset.segment, part.dataset.row]] = part.dataset.color;
    }
    return color_map;
}
