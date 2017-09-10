
class DOMLocations {

	constructor() {
		this.main          = document.getElementById('main') ? document.getElementById('main') : this.setupControls();
		this.actions       = document.getElementById('actions');
		this.optional      = [
			{
			  selector          : 'icing_type',
			  selected_value    : 'swirl',
			  affected_selector : 'type',
			  change_state      : ['tall', 'short']
			},
			{
			  selector          : 'type',
			  selected_value    : 'tall',
			  affected_selector : 'hasWafer',
			  change_state      : [true, false]
			},
			{
			  selector          : 'type',
			  selected_value    : 'short',
			  affected_selector : 'hasCream',
			  change_state      : [true, false]
			}
		]
	}

	setupControls() {
        _createElement('appHolder');
        _createElement('main', 'appHolder');
        _createElement('actions', 'appHolder');

        _createElement('randomize', 'actions', 'button');
		_createElement('edit', 'actions', 'button');
	}
}

function _createElement(child, parent, type) {
	let elementType = type ? type : 'div';
    let newChildElement = document.createElement(elementType);
    newChildElement.id = child;

    if (type === 'button') {
        newChildElement.classList = 'btn btn-sm btn-default';
        newChildElement.innerHTML = child;
	}

    if (!parent) {
        document.body.appendChild(newChildElement);
    } else {
        document.getElementById(parent).appendChild(newChildElement);
	}
}

module.exports = new DOMLocations();