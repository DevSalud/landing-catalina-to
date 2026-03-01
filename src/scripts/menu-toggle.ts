const menu = document.getElementById('mobile-menu') as HTMLDivElement
const openBtn = document.getElementById('open-menu') as HTMLButtonElement
const closeBtn = document.getElementById('close-menu') as HTMLButtonElement
const navItems = menu.querySelectorAll('.mobile-nav-item a')

const openMenu = () => {
	menu.classList.add('is-open')
	document.body.style.overflow = 'hidden'
	closeBtn.classList.remove('hidden')
	openBtn.classList.add('hidden')
	openBtn.setAttribute('aria-expanded', 'true')
	menu.setAttribute('aria-hidden', 'false')
}

const closeMenu = () => {
	menu.classList.remove('is-open')
	document.body.style.overflow = 'auto'
	openBtn.classList.remove('hidden')
	closeBtn.classList.add('hidden')
	openBtn.setAttribute('aria-expanded', 'false')
	menu.setAttribute('aria-hidden', 'true')
}

openBtn.addEventListener('click', openMenu)
closeBtn.addEventListener('click', closeMenu)
for (const item of navItems) {
	item.addEventListener('click', closeMenu)
}

// Cerrar con Escape
document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape') {
		closeMenu()
	}
})
