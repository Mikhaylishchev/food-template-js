function tabs(tabsSelector, tabsContentSelector, activityClass) {

    const tabs = document.querySelectorAll(tabsSelector); //      Tabs
    const tabsContent = document.querySelectorAll(tabsContentSelector);
    const tabClassActive = activityClass;

    function hideTabsContent() {

        tabsContent.forEach(item => {

            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(tab => tab.classList.remove(tabClassActive));
    }

    function showTabContent(i = 0) {

        tabsContent[i].classList.add('show', 'fade');
        tabs[i].classList.add(tabClassActive);
    }

    tabs.forEach((item, i) => {

        item.addEventListener('click', (event) => {

            hideTabsContent();
            showTabContent(i);
        })
    });

    hideTabsContent();
    showTabContent();
}

export default tabs;