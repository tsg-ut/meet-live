const containers = Array.from(document.getElementsByClassName('videocontainer'));
const participants = containers.filter(e => e.id.startsWith('participant'));
const participantIds = participants.map(p => p.id);
const participantNames = participants.map(p => document.getElementById(p.id + '_name').innerHTML);
let nameToId = {};
let idToName = {};
for (let i = 0; i < participants.length; i++) {
    const name = participantNames[i].toLowerCase();
    const id = participantIds[i];
    nameToId[name] = id;
    idToName[id] = name;
}

const getCurrentFocus = () => {
    const id = participants.filter(e => Array.from(e.classList).includes('videoContainerFocused'))[0].id;
    const name = idToName[id];
    return [ name, participantNames ];
};

const focus = name => {
    const currentSpeakerName = getCurrentFocus();
    if (name !== currentSpeakerName) {
        document.getElementById(nameToId[name]).click();
    }
};