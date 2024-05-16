let participants = [];
let participantIds = [];
let participantNames = [];
let nameToId = {};
let idToName = {};

const update = () => {
    participants = Array.from(
        document.getElementsByClassName('display-video')
    );
    participantIds = participants.map(p => p.id);
    participantNames = participants.map(p =>
        document.getElementById(p.id + '_name').innerHTML.replace("'s screen", '')
    );
    for (let i = 0; i < participants.length; i++) {
        const name = participantNames[i].toLowerCase();
        const id = participantIds[i];
        nameToId[name] = id;
        idToName[id] = name;
    }
};

const getCurrentFocus = () => {
    update();
    const id = participants.filter(e => Array.from(e.classList).includes('videoContainerFocused'))[0].id;
    const name = idToName[id];
    return [ name, participantNames.map(name => name.toLowerCase()) ];
};

const focus = _name => {
    const name = _name.toLowerCase();
    const currentSpeakerName = getCurrentFocus()[0];
    if (name !== currentSpeakerName) {
        document.getElementById(nameToId[name]).click();
    }
};
