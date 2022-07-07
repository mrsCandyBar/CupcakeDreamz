class Build {

    randomItem(builder) {

        let brief = {};
        for (let property in builder) {
            if(property != 'optional') {
                let index = _randomNumber(builder[property]);

                if (brief[property] === builder[property][index]) {
                    index = _randomNumber(builder[property]);
                }

                brief[property] = builder[property][index];
            }
        }

        _checkOptionalValues(builder.optional, brief);
        return brief;
    }
}

function _randomNumber(obj) {
    return Math.round(Math.random() * (obj.length - 1));
}

function _checkOptionalValues(optional, brief) {
    optional.forEach((obj) => {
        if (brief[obj.selector] === obj.selected_value) {

            brief[obj.affected_selector] = obj.change_state[0];
            if (obj.change_state[0] === true) {
                brief[obj.affected_selector] = obj.change_state[_randomNumber(obj.change_state)];
            }

        } else {
            brief[obj.affected_selector] = obj.change_state[1];
        }
    });
}

module.exports = new Build();