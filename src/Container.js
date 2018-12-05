import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import AnimatedModal from 'react-native-modal';

const IOS_MODAL_ANIMATION = {
	from: { opacity: 0, scale: 1.2 },
	0.5: { opacity: 1 },
	to: { opacity: 1, scale: 1 }
};

export default class DialogContainer extends React.PureComponent {
	static propTypes = {
		blurComponentIOS: PropTypes.node,
		buttonSeparatorStyle: PropTypes.object,
		children: PropTypes.node.isRequired,
		contentStyle: PropTypes.object,
		footerStyle: PropTypes.object,
		headerStyle: PropTypes.object,
		visible: PropTypes.bool
	};

	static defaultProps = {
		visible: false
	};

	render() {
		const {
			blurComponentIOS,
			buttonSeparatorStyle = {},
			children,
			contentStyle = {},
			footerStyle = {},
			headerStyle = {},
			visible,
			...otherProps
		} = this.props;
		const titleChildrens = [];
		const descriptionChildrens = [];
		const buttonChildrens = [];
		const otherChildrens = [];
		React.Children.forEach(children, (child) => {
			if (!child) {
				return;
			}
			if (child.type.name === 'DialogTitle' || child.type.displayName === 'DialogTitle') {
				titleChildrens.push(child);
			} else if (child.type.name === 'DialogDescription' || child.type.displayName === 'DialogDescription') {
				descriptionChildrens.push(child);
			} else if (child.type.name === 'DialogButton' || child.type.displayName === 'DialogButton') {
				if (buttonChildrens.length > 0) {
					buttonChildrens.push(<View style={[ styles.buttonSeparator, buttonSeparatorStyle ]} />);
				}
				buttonChildrens.push(child);
			} else {
				otherChildrens.push(child);
			}
		});
		return (
			<AnimatedModal
				backdropOpacity={0.3}
				style={styles.modal}
				isVisible={visible}
				animationIn={Platform.OS === 'ios' ? IOS_MODAL_ANIMATION : 'zoomIn'}
				animationOut={'fadeOut'}
				{...otherProps}
			>
				<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
					<View style={[ styles.content, contentStyle ]}>
						<View style={styles.blur} />
						<View style={[ styles.header, headerStyle ]}>
							{titleChildrens}
							{descriptionChildrens}
						</View>
						{otherChildrens}
						{Boolean(buttonChildrens.length) && (
							<View style={[ styles.footer, footerStyle ]}>
								{buttonChildrens.map((x, i) =>
									React.cloneElement(x, {
										key: `dialog-button-${i}`
									})
								)}
							</View>
						)}
					</View>
				</KeyboardAvoidingView>
			</AnimatedModal>
		);
	}
}

const styles = StyleSheet.create({
	modal: {
		flex: 1,
		marginLeft: 0,
		marginRight: 0,
		marginTop: 0,
		marginBottom: 0
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	blur: {
		position: 'absolute',
		backgroundColor: 'rgb(255,255,255)',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0
	},
	content: {
		width: '80%',
		flexDirection: 'column',
		borderRadius: 13,
		overflow: 'hidden'
	},
	header: Platform.select({
		ios: {
			margin: 18
		},
		android: {
			margin: 12
		}
	}),
	footer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderTopColor: '#A9ADAE',
		borderTopWidth: StyleSheet.hairlineWidth,
		height: 46
	},
	buttonSeparator: {
		height: '100%',
		backgroundColor: '#A9ADAE',
		width: StyleSheet.hairlineWidth
	}
});

