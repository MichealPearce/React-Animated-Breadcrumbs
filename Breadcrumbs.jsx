import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import classNames from 'classnames'

import styles from './styles.module.scss'
import transitions from './transitions.module.scss'

console.log(transitions)

export default class Breadcrumbs extends Component {
	
	generateBreadCrumbs(path) {
		
		let list = []
		let crumbs = path.split('/').filter(Boolean)
		let link = '/'
		let transDelay = 0

		crumbs.forEach(crumb => {
			link += crumb+'/'
			list.push(
				<CSSTransition
					key={crumb}
					timeout={transDelay}
					classNames={{
						enter: transitions.enter,
						enterActive: transitions.enterActive,
						enterDone: transitions.enterDone,
						exit: transitions.exit,
						exitActive: transitions.exitActive
					}}
				>
					<div className={styles.crumb}
						style={{
							'transitionDuration': transDelay+'ms'
						}}
					>
						<NavLink exact to={link} 
							activeClassName={styles.activeLink}
						>
							{crumb}
						</NavLink>
					</div>
				</CSSTransition>
			)
			transDelay += 25
		})

		return list
		
	}

	render() {

		let props = this.props

		let homeCrumbClasses = classNames([
			styles.crumb,
			(props.path === '/') ? styles.homeCrumb : ''
		])

		return (
			<div className={styles.breadcrumbs}>
				<div className={homeCrumbClasses}>
					<NavLink exact to="/"
						activeClassName={styles.activeLink}
					>
						Home
					</NavLink>
				</div>
				<TransitionGroup className={styles.container} >
					{this.generateBreadCrumbs(props.path)}
				</TransitionGroup>
			</div>
		)
	}

}
