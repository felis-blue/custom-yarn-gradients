let segment_count_field, thread_count_field;

window.onload = () => {
    segment_count_field = document.getElementById('yarn-length');
    segment_count_field.onchange = updateAll;
    thread_count_field = document.getElementById('thread-count');
    thread_count_field.onchange = updateAll;

    setupActionButtons();
    populateColors();
    updateAll();
}

function setupActionButtons() {
    document.getElementById('copy-pattern-code').onclick = handleCopyPatternCodeClick;
    document.getElementById('download-svg-link').onclick = handleDownloadSvgClick;
    document.getElementById('download-png-link').onclick = handleDownloadPngClick;
}

function populateColors() {
    let template_div = document.getElementById('color-templates');
    let template = document.querySelector('.color-template');
    template.onclick = handleTemplateClick;
    template.dataset.color = '000';
    let stylesheet = document.getElementById('color-styles').sheet;

    // create color template buttons for all colors from colors.js
    for (let [color_num, c] of colors) {
        let new_template = template.cloneNode();
        new_template.dataset.color = color_num;
        new_template.classList.add(c.text_color);
        new_template.innerText = c.name;
        new_template.onclick = handleTemplateClick;
        template_div.insertBefore(new_template, template);

        // add the corresponding css rule for the current color
        let new_rule = `[data-color="${color_num}"] {--color: ${c.hex};}`
        stylesheet.insertRule(new_rule);
    }
}

function updateAll() {
    let segment_count = parseInt(segment_count_field.value);
    let thread_count = parseInt(thread_count_field.value);

    if (!(segment_count && thread_count)) {
        return;
    }

    // update resulting weight
    let weight = Math.floor(segment_count * thread_count * 5 / 15) * 10;
    document.getElementById('yarn-weight').innerText = `${weight}g`;

    // update the color segment section
    let color_div = document.getElementById('yarn-colors');
    color_div.replaceChildren();
    for (let segment = 0; segment < segment_count; segment++) {
        for (let thread = 0; thread < thread_count; thread++) {
            let color_part = document.createElement('button');
            color_part.setAttribute('type', 'button');
            color_part.classList.add('color', 'color-part');
            color_part.dataset.segment = segment;
            color_part.dataset.row = thread;
            color_part.dataset.color = '000';
            color_part.onclick = handleColorPartClick;

            color_div.append(color_part);
        }
    }

    createPattern();
}

function handleTemplateClick(event) {
    color = event.target.dataset.color;

    // color all focused color segments and toggle focus state
    let focused_color_parts = document.querySelectorAll('.color-part.focus');
    for (let part of focused_color_parts) {
        part.dataset.color = color;
        part.classList.toggle('focus');
    }

    createPattern();
}

async function createPattern() {
    let segment_count = parseInt(segment_count_field.value);
    let thread_count = parseInt(thread_count_field.value);

    if (!(segment_count && thread_count)) {
        return;
    }

    // pattern parameters
    let row_repeats = 3;
    let colunm_repeats = 85;
    let template_width = 50;
    let template_height = 40;
    let template_spacing_width = 2;
    let template_spacing_height = -12;

    let color_map = getColorMap();

    // set the svg attributes
    let svg = document.getElementById('svg');
    let width = colunm_repeats * template_width + (colunm_repeats - 1) * template_spacing_width;
    let rows_total = segment_count * row_repeats;
    let height = rows_total * template_height + (rows_total - 1) * template_spacing_height;
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    // reset previous pattern
    let group = document.getElementById('path-group');
    group.replaceChildren();

    // create the pattern svg using the existing path templates
    for (let segment = 0; segment < segment_count; segment++) {
        let color_array = [...color_map[segment]];
        for (let row = 0; row < row_repeats; row++) {
            for (let col = 0; col < colunm_repeats; col++) {
                // shuffle the colors for each repeat within a segment
                const shuffled_colors = color_array.sort(() => 0.5 - Math.random());
                for (let thread = 0; thread < thread_count; thread++) {
                    // create the use tag linking to the correct path template
                    let path = document.createElementNS(svg.namespaceURI, 'use');
                    path.setAttribute('href', `#path-${thread_count}-${thread}`);

                    // fill with color from color shuffle
                    let color = shuffled_colors[thread];
                    if (color != '000') {
                        path.setAttribute('fill', colors.get(color).hex);
                    }

                    // set the position
                    let x = col * (template_width + template_spacing_width);
                    let y = (segment * row_repeats + row) * (template_height + template_spacing_height);
                    path.setAttribute('x', x);
                    path.setAttribute('y', y);

                    group.appendChild(path);
                }
            }
        }
    }

    // svg download
    let src = createSvgBlob(svg);
    document.getElementById('download-svg-link').dataset.url = src;

    // png download
    let image = await loadedImgWithSource(src);

    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');
    canvas.width = width / 2;
    canvas.height = height / 2;
    context.drawImage(image, 0, 0, width / 2, height / 2);
    let png = canvas.toDataURL('image/png');
    document.getElementById('download-png-link').dataset.url = png;
}

function getColorMap() {
    // create a map of the current colors by segment and row
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

function createSvgBlob(svg) {
    // create a blob url from the given svg
    let svg_string = new XMLSerializer().serializeToString(svg);
    let svg_blob = new Blob([svg_string], { type: 'image/svg+xml;charset=utf-8' });
    return URL.createObjectURL(svg_blob);
}

function loadedImgWithSource(src) {
    // returns a promise that resolves to an image with the source fully loaded
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = src;
    })
}

function handleColorPartClick(event) {
    // toggle focus state on normal click
    let toggle_state = event.target.classList.toggle('focus');

    if (event.shiftKey) {
        // toggle focus state of all segments that
        //  * are on the same row as the clicked segment
        //  * are before the clicked segment
        //  * and have the same color as the clicked segment
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

function handleDownloadSvgClick(event) {
    let url = event.target.dataset.url;
    triggerDownload(url, 'colors.svg');
}

async function handleDownloadPngClick(event) {
    let url = event.target.dataset.url;
    triggerDownload(url, 'colors.png');
}

function triggerDownload(uri, fileName) {
    // triggers a download event with the given uri and filename
    let link = document.createElement('a');
    link.setAttribute('download', fileName);
    link.href = uri;
    link.click();
}

function handleCopyPatternCodeClick(event) {
    const code = createPatternCode();
    navigator.clipboard.writeText(code);
    event.target.classList.add('copied');
    setTimeout(() => {
        event.target.classList.remove('copied');
    }, 1500);
}

function createPatternCode() {
    const segment_count = parseInt(segment_count_field.value);
    const thread_count = parseInt(thread_count_field.value);

    if (!(segment_count && thread_count)) {
        return;
    }

    const color_map = getColorMap();

    let pattern_code = `${segment_count}-${thread_count}`;
    let streak, last_color, current_color;
    for (let thread = 0; thread < thread_count; thread++) {
        pattern_code += '|';
        streak = 0;
        last_color = color_map[0][thread];
        for (let segment = 0; segment < segment_count; segment++) {
            current_color = color_map[segment][thread];
            if (current_color != last_color) {
                pattern_code += `${streak}x${last_color}-`;
                streak = 0;
                last_color = current_color;
            }
            streak++;
        }
        pattern_code += `${streak}x${last_color}`;
    }
    return pattern_code;
}
