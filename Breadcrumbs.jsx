import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import classNames from 'classnames'

import styles from './styles.module.scss'
import transitions from './transitions.module.scss'

let TransCrumb = (props) => {

	let crumb = props.crumb
	let delay = props.delay

	return (
		<CSSTransition
			key={crumb}
			timeout={delay}
			classNames={{
				enter: transitions.enter,
				enterActive: transitions.enterActive,
				enterDone: transitions.enterDone,
				exit: transitions.exit,
				exitActive: transitions.exitActive
			}}
		>
			<NavCrumb crumb={crumb} delay={delay} link={link} />
		</CSSTransition>
	)
}

let NavCrumb = (props) => {

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
		
		let crumbEls = []
		let crumbs = path.split('/').filter(Boolean)
		let link = '/'
		let transDelay = 0

		crumbs.forEach(crumb => {
			link += crumb+'/'
			crumbEls.push(
				<NavCrumb
					crumb={crumb}
					delay={transDelay}
					link={link}
				/>
			)
			transDelay += 25
		})

		return crumbEls
		
	}

	render() {

		let props = this.props

		return (
			<div className={styles.breadcrumbs}>
				<NavCrumb crumb="Home" link="/" />
				<TransitionGroup className={styles.container} >
					{this.generateBreadCrumbs(props.path)}
				</TransitionGroup>
			</div>
		)
	}

}
