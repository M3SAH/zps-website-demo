document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-button');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterButtons.length || !projectCards.length) return;

    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;

            filterButtons.forEach((item) => item.classList.toggle('active', item === button));

            projectCards.forEach((card) => {
                const category = card.dataset.category;
                const shouldShow = filter === 'all' || category === filter;
                card.classList.toggle('hidden', !shouldShow);
            });
        });
    });
});
