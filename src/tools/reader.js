const summaryTableStats = {
    attributes: {
        count: 0,
        target: 8,
    },
    skills: {
        count: 0,
        target: 18,
    },
    spells: {
        count: 0,
        target: 26,
    },
    enchantments: {
        count: 0,
        target: 15,
    },
    maxHPMP: {
        count: 0,
        target: 2,
    },
};

const updateSaveCharacterInfo = (saveFile) => {
    const playerBlock = saveFile.blocks.find((block) => block.ID === 50000);

    if (playerBlock === undefined) {
        throw 'Could not find player block!';
    }

    // save name
    setText('.save-tree-file.character-name', playerBlock.name);

    // level
    setText('.save-tree-file.location-summary', `${playerBlock.x}, ${playerBlock.y}, ${playerBlock.z}`);

    setText('.save-tree-file.facing-summary', `${playerBlock.rotation}, ${playerBlock.yaw} (${playerBlock.pauseYaw})`);
    setText('.save-tree-file.gender', playerBlock.gender.mappedValue);

    setText('.save-tree-file.class-name', `${playerBlock.className} (${playerBlock.className2})`);
    setText('.save-tree-file.race', playerBlock.race.mappedValue);

    setText('.save-tree-file.wounds-summary', `${playerBlock.currentWounds}/${playerBlock.maxWounds}`);
    setText('.save-tree-file.spell-points-summary', `${playerBlock.currentSP}/${playerBlock.maxSP}`);

    if (playerBlock.maxWounds === 588) summaryTableStats.maxHPMP.count++;
    if (playerBlock.maxSP === 300) summaryTableStats.maxHPMP.count++;

    console.log(playerBlock);
};

const updateSaveAttributeTable = (saveFile) => {
    const playerBlock = saveFile.blocks.find((block) => block.ID === 50000);

    if (playerBlock === undefined) {
        throw 'Could not find player block!';
    }

    const table = document.querySelector('.bsr-attributes-column table');
    [...table.querySelectorAll('[data-map-from]')].forEach((e) => {
        const key = e.attributes.getNamedItem('data-map-from').value;
        const value = playerBlock[key];
        if (key.startsWith('normal') && value >= 100) summaryTableStats.attributes.count++;
        e.innerText = value;
    });
};

const updateSaveSkillTable = (saveFile) => {
    const playerBlock = saveFile.blocks.find((block) => block.ID === 50000);

    if (playerBlock === undefined) {
        throw 'Could not find player block!';
    }

    const table = document.querySelector('.bsr-skills-column table');
    [...table.querySelectorAll('[data-map-from]')].forEach((e) => {
        const src = playerBlock[e.attributes.getNamedItem('data-map-from').value];
        const attr = [...e.classList.entries()].find((e) => e[1].startsWith('---'))[1].slice(3);
        const value = src[attr];
        if (attr === 'normal' && value >= 100) summaryTableStats.skills.count++;
        e.innerText = value;
    });
};

const updateSaveSpellTable = (saveFile) => {
    const spellBlocks = saveFile.blocks.filter((block) => block.type === window.reader.SaveTree.BlockTypeEnum.BlockTypeEnum.SpellBlock);

    const table = document.querySelector('.bsr-spells-column table');
    [...table.querySelectorAll('[data-spell-name]')].forEach((e) => {
        const spellName = e.attributes.getNamedItem('data-spell-name').value;
        const known = spellBlocks.find((b) => b.name === spellName);
        if (known) summaryTableStats.spells.count++;
        e.innerText = known ? '✔' : '✖';
    });
};

const inPlayer = (saveFile, block) => {
    if(block === undefined) return false;
    if(block.currentLocationID === 50000) return true;
    if(block.currentLocationID > 1) return inPlayer(saveFile, saveFile.blocks.find(b=>b.ID===block.currentLocationID));
    return false;
};

const updateSaveEnchantmentsTable = (saveFile) => {
    const itemBlocks = saveFile.blocks.filter((block) => block.type === window.reader.SaveTree.BlockTypeEnum.BlockTypeEnum.ItemBlock);

    const table = document.querySelector('.bsr-enchantments-column table');
    [...table.querySelectorAll('[data-item-check]')].forEach((e) => {
        const nameEle = e.parentElement.querySelector('[data-item-name]');
        const enchEle = e.parentElement.querySelector('[data-item-ench]');
        const itemName = nameEle.attributes.getNamedItem('data-item-name').value;
        const enchName = enchEle.attributes.getNamedItem('data-item-ench').value;
        const items = itemBlocks.filter((b) => b.name === itemName && b.nameExtension === enchName);
        const ownedCount = items.filter((i) => inPlayer(saveFile, i)).length;
        let text = '';
        if (itemName === 'Boot' && enchName === 'of Peace') {
            if (ownedCount === 2) {
                text = '✔✔';
            } else if (ownedCount === 1) {
                text = '✔✖';
            } else {
                text = '✖✖';
            }
            summaryTableStats.enchantments.count += ownedCount;
        } else {
            if (ownedCount > 0) {
                summaryTableStats.enchantments.count++;
            }
            text = ownedCount > 0 ? '✔' : '✖';
        }
        e.innerText = text;
    });
};

const updateSummaryTable = () => {
    const table = document.querySelector('.bsr-progress-column table');

    for (const key in summaryTableStats) {
        const currentCell = table.querySelector('.summary-table.progress-' + key + '-current');
        const targetCell = table.querySelector('.summary-table.progress-' + key + '-target');
        currentCell.innerText = summaryTableStats[key].count;
        targetCell.innerText = summaryTableStats[key].target;
    }
};

const readSaveFile = (ts, saveFile) => {
    Object.values(summaryTableStats).forEach((e) => e.count = 0);

    updateSaveCharacterInfo(saveFile);
    updateSaveAttributeTable(saveFile);
    updateSaveSkillTable(saveFile);
    updateSaveSpellTable(saveFile);
    updateSaveEnchantmentsTable(saveFile);

    updateSummaryTable();

    updateDebugTable(ts, saveFile);
};

const updateDebugTable = (ts, saveFile) => {
    const table = document.querySelector('.bsr-debug-column table');
    const tbody = table.querySelector('tbody');
    [...tbody.querySelectorAll('tr:not(.template)')].forEach(e=>e.remove());
    /** @type {Element} */
    const template = table.querySelector('.template').cloneNode(true);
    template.classList.remove('template');

    const blockCounts = {};

    saveFile.blocks.forEach((block) => {
        const blockType = window.reader.SaveTree.BlockTypeEnum.BlockTypeEnum[block.type];
        blockCounts[blockType] ??= 0;
        blockCounts[blockType]++;
    });

    for (const key of Object.values(window.reader.SaveTree.BlockTypeEnum.BlockTypeEnum).reverse()) {
        const num = parseInt(key);
        if (isNaN(num)) continue;
        const type = window.reader.SaveTree.BlockTypeEnum.BlockTypeEnum[num];
        const newRow = template.cloneNode(true);
        newRow.querySelector('th').innerText = `${type} (${num}) count:`;
        newRow.querySelector('td').innerText = `${blockCounts[type] ?? 0}`;
        tbody.appendChild(newRow);
    }

    console.log(ts, saveFile);
};

const handleSaveName = (ts, saveName) => {
    setText('.save-name-file.save-name', saveName.name);
    setText('.save-name-file.level', saveName.level);
};

const setText = (selector, text) => {
    [...document.querySelectorAll(selector)].forEach((e) => e.innerText = text);
};

const handleImage = (ts, image) => {
    [...document.querySelectorAll('.screenshot > *')].forEach(e=>e.remove());
    let tmpCanvas = document.createElement('canvas');
    tmpCanvas.width = image.width;
    tmpCanvas.height = image.height;
    let ctx = tmpCanvas.getContext('2d');
    let data = ctx.getImageData(0,0,tmpCanvas.width,tmpCanvas.height);
    for (let offset = 0; offset < image.pixels.length; ++offset) {
        const pixel = image.pixels[offset];
        data.data[(offset*4)] = pixel.r;
        data.data[(offset*4)+1] = pixel.g;
        data.data[(offset*4)+2] = pixel.b;
        data.data[(offset*4)+3] = 255;
    }
    ctx.putImageData(data, 0, 0);
    document.querySelector('.screenshot').append(tmpCanvas);
    console.log(image);
};

document.addEventListener('DOMContentLoaded', () => {
    const ignoreEvent = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    // Handle drag+drop of files. Have to ignore dragenter/dragover for compatibility reasons.
    document.body.addEventListener('dragenter', ignoreEvent);
    document.body.addEventListener('dragover', ignoreEvent);

    /**
     * @param {DragEvent} e 
     */
    const dropHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const dt = e.dataTransfer;
        if (dt) {
            const files = dt.files;
            for (const file of files) {
                const ucFilename = file.name.split('/').pop().toUpperCase();
                if (ucFilename === 'SAVETREE.DAT') {
                    void file.arrayBuffer().then((b) => {
                        let ts = Date.now();
                        console.log(`Starting SAVETREE.DAT parse at ${ts}`);
                        const saveFile = new window.reader.SaveTree.SaveTree.default();
                        saveFile.deserializeFrom(Buffer.Buffer.from(b));
                        let ts2 = Date.now();
                        console.log(`SAVETREE.DAT parse done, elapsed ${ts2 - ts}`);
                        ts = ts2;
                        readSaveFile(ts, saveFile);
                    });
                } else if (ucFilename === 'IMAGE.RAW') {
                    void file.arrayBuffer().then((b) => {
                        let ts = Date.now();
                        console.log(`Starting IMAGE.RAW parse at ${ts}`);
                        const image = window.reader.Image.Image.RawImageToImage(Buffer.Buffer.from(b));
                        let ts2 = Date.now();
                        console.log(`IMAGE.RAW parse done, elapsed ${ts2 - ts}`);
                        ts = ts2;
                        handleImage(ts, image);
                    });
                } else if (ucFilename === 'SAVENAME.DAT') {
                    void file.arrayBuffer().then((b) => {
                        let ts = Date.now();
                        console.log(`Starting SAVENAME.DAT parse at ${ts}`);
                        const saveNameData = window.reader.SaveName.SaveName.ParseSaveNameData(Buffer.Buffer.from(b));
                        let ts2 = Date.now();
                        console.log(`SAVENAME.DAT parse done, elapsed ${ts2 - ts}`);
                        ts = ts2;
                        handleSaveName(ts, saveNameData);
                    });
                }
            }
        }
    };

    document.body.addEventListener('drop', dropHandler);
});
