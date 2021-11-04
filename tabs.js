const tabList = document.querySelector('[role="tablist"]')
const tabs = tabList.querySelectorAll('[role="tab"]')

tabList.addEventListener("keydown", changeTabFocus)

tabs.forEach((tab) => {
    tab.addEventListener("click", changeTabPanel)
})


let tabFocus = 0
function changeTabFocus(e) {
    // change the tabindex of the current tab to -1
    if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
        // select first tab
        tabs[tabFocus].setAttribute("tabindex", -1)

        // if the right key is pushed, move to the next tab on the right
        // else if the left key is pushed, move to the next tab on the left
        if (e.code === 'ArrowRight') {
            tabFocus++
            if (tabFocus >= tabs.length) {
                tabFocus = 0
            }
        } else if (e.code === 'ArrowLeft') {
            tabFocus--
            if (tabFocus < 0) {
                tabFocus = tabs.length - 1 /* last tab = [last number -1 ] */
            }
        }

        tabs[tabFocus].setAttribute("tabindex", 0)
        tabs[tabFocus].focus()
    }
}

function changeTabPanel(e) {
    const targetTab = e.target
    const targetPanel = targetTab.getAttribute("aria-controls")

    const targetImage = targetTab.getAttribute("data-image")

    const tabContainer = targetTab.parentNode
    const mainContainer = tabContainer.parentNode

    // switch active tab underline
    tabContainer.querySelector('[aria-selected="true"]').setAttribute("aria-selected", false)
    targetTab.setAttribute("aria-selected", true)

    // switch article content
    hideContent(mainContainer, '[role="tabpanel"]')
    showContent(mainContainer, [`#${targetPanel}`])

    // switch image
    hideContent(mainContainer, "picture")
    showContent(mainContainer, [`#${targetImage}`])
}

function hideContent(parent, content) {
    parent.querySelectorAll(content)
        .forEach((item) => item.setAttribute("hidden", true))
}

function showContent(parent, content) {
    parent.querySelector(content).removeAttribute("hidden")
}