const details = document.getElementById(
	'about-collapsible',
) as HTMLDetailsElement
const summaryText = details?.querySelector('.summary-text')
if (details && summaryText) {
	details.addEventListener('toggle', () => {
		summaryText.textContent = details.open
			? 'Leer menos'
			: 'Conocer más sobre mi enfoque'
	})
}
