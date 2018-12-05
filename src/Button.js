import React from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';

const COLOR = '#007ff9';

export default class DialogButton extends React.PureComponent {
	static propTypes = {
		...Text.propTypes,
		label: PropTypes.string.isRequired,
		color: PropTypes.string,
		bold: PropTypes.bool,
		disabled: PropTypes.bool,
		onPress: PropTypes.func.isRequired
	};

	static defaultProps = {
		color: COLOR,
		disabled: false
	};

	static displayName = 'DialogButton';

	render() {
		const { label, color, disabled, bold, onPress, style, ...otherProps } = this.props;
		const fontWeight = bold ? '600' : 'normal';
		return (
			<TouchableOpacity style={styles.button} onPress={onPress} disabled={disabled}>
				<Text style={[ styles.text, { color: color, fontWeight: fontWeight }, style ]} {...otherProps}>
					{Platform.OS === 'ios' ? label : label.toUpperCase()}
				</Text>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	button: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	text: {
		textAlign: 'center',
		fontSize: 17,
		backgroundColor: 'transparent'
	}
});
