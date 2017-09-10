class Build {

    randomItem(store) {
        if (store['builder']) {
            let builder = store['builder'];
            let brief = store['brief'];

            for (let property in builder) {
                let index = _randomNumber(builder[property]);

                if (brief[property] === builder[property][index]) {
                    index = _randomNumber(builder[property]);
                }

                brief[property] = builder[property][index];
            }

            _checkOptionalValues(store);
            store['active'] = '';
            return store;
        }
    }

    doesItemExist(store) {
        _toggleClass('add', 'remove');
        _toggleClass('remove', 'add');
        document.getElementById('favourites').classList.remove('disabled');

        if (store['items'].length > 0) {
            store['items'].forEach(item => {
                item['status'] = '';

                if (JSON.stringify(item['content']) === JSON.stringify(store['brief'])) {
                    _toggleClass('add', 'add');
                    _toggleClass('remove', 'remove');
                    item['status'] = 'active';
                }
            });

        } else {
            document.getElementById('favourites').classList.add('disabled');
        }
    }
}

function _toggleClass(id, action) {
    let targetElement = document.getElementById(id).classList;
    if (action === 'remove') {
        targetElement.remove('hidden');
    } else {
        targetElement.add('hidden');
    }
}

function _randomNumber(obj) {
    return Math.round(Math.random() * (obj.length - 1));
}

function _checkOptionalValues(store) {
    store['$dom']['optional'].forEach((obj) => {
        if (store['brief'][obj.selector] === obj.selected_value) {

            store['brief'][obj.affected_selector] = obj.change_state[0];
            if (obj.change_state[0] === true) {
                store['brief'][obj.affected_selector] = obj.change_state[_randomNumber(obj.change_state)];
            }

        } else {
            store['brief'][obj.affected_selector] = obj.change_state[1];
        }
    });
}

module.exports = new Build();