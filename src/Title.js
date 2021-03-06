import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, TouchableOpacity, Platform, StyleSheet, Text } from 'react-native';

const closeIcon = require('./close_icon.png');

export default class DialogTitle extends React.PureComponent {
	static propTypes = {
		...Text.propTypes,
		style: PropTypes.any,
		container: PropTypes.any,
		children: PropTypes.string.isRequired,
		closebutton: PropTypes.shape({
			show: PropTypes.bool.isRequired,
			clickhandler: PropTypes.func.isRequired
		})
	};

	static defaultProps = {
		closebutton: {
			show: false,
			clickhandler: () => {}
		}
	};

	static displayName = 'DialogTitle';

	render() {
		const { style, closebutton, container, children, ...otherProps } = this.props;
		return (
			<View style={[ styles.container, container ]}>
				<Text style={[ styles.text, style ]} {...otherProps}>
					{children}
				</Text>
				{closebutton.show ? (
					<TouchableOpacity style={{ padding: '2%', paddingLeft: '7%' }} onPress={closebutton.clickhandler}>
						<Image style={styles.icon} resizeMode="contain" source={closeIcon} />
					</TouchableOpacity>
				) : null}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: Platform.select({
		ios: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			marginLeft: 0,
			marginRight: 0,
			paddingLeft: 18,
			paddingRight: 18,
			paddingBottom: 11
		},
		android: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			marginLeft: 0,
			marginRight: 0,
			padding: 0
		}
	}),
	text: Platform.select({
		ios: {
			color: 'black',
			textAlign: 'center',
			fontSize: 18,
			fontWeight: '600'
		},
		android: {
			color: 'black',
			fontWeight: '500',
			fontSize: 18
		}
	}),
	icon: {
		width: 12,
		height: 12
	}
});

