import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import propTypes from 'prop-types'
import classNames from 'classnames'

import styles from './styles.module.scss'
import transitions from './transitions.module.scss'

let NavCrumb = props => {

	let crumb = props.crumb
	let delay = (props.delay) ? props.delay : 0
	let link  = props.link

	return (
		<div className={styles.crumb}
		style={{'transitionDuration': delay+'ms'}}>
			<NavLink exact to={link} 
			activeClassName={styles.activeLink}>
				{crumb}
			</NavLink>
		</div>
	)

}

export default class Breadcrumbs extends Component {

	generateBreadCrumbs(path) {
		
		let crumbs = path.split('/').filter(Boolean)
		let link = '/'
		let duration = 0

		return crumbs.map((crumb, id) => {
			link += crumb+'/'
			duration += 50
			return (
				<CSSTransition
					key={id}
					timeout={duration}
					classNames={{
						enter: transitions.enter,
						enterActive: transitions.enterActive,
						enterDone: transitions.enterDone,
						exit: transitions.exit,
						exitActive: transitions.exitActive
					}}
				>
					<NavCrumb crumb={crumb} delay={duration} link={link} />
				</CSSTransition>
			)
		})
		
	}

	render() {

		let props = this.props
		let elClasses = classNames(
			styles.breadcrumbs,
			props.className
		)

		return (
			<div className={elClasses}>
				<NavCrumb crumb="Home" link="/" />
				<TransitionGroup className={styles.container} >
					{this.generateBreadCrumbs(props.path)}
				</TransitionGroup>
			</div>
		)
	}

}

Breadcrumbs.propTypes = {
	className: propTypes.string,
	path: propTypes.string.isRequired
}