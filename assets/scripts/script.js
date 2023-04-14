const notificationList = document.querySelectorAll(".j_notification");
const notificationTitle = document.querySelector(".j_notification_title");
const clearButton = document.querySelector(".j_clear_all");
let notificationCount = 0;
let notificationCountElement = null;

const createSpanElement = (spanClass) => {
    let element = document.createElement("span");
    element.className = spanClass;

    return element;
}

const loadNotifications = () => {
    notificationCountElement = createSpanElement("notification_count");
    notificationCount = notificationList.length;
    notificationCountElement.innerHTML = notificationCount;

    notificationTitle.append(notificationCountElement);

    notificationList.forEach((notification) => {
        notification.classList.add("unread");
        notification.querySelector("h2").appendChild(createSpanElement("unread_mark"));
    })
}

const setReadNotification = (notification) => {
    let unread = notification.querySelector("h2").lastElementChild;

    if (unread.classList.contains("unread_mark") && notification.classList.contains("unread")) {
        notification.classList.remove("unread");
        notification.querySelector("h2 .unread_mark").remove();
        notificationCount -= 1;
        notificationCountElement.innerText = notificationCount;
    }
}

const setReadAllNotifications = () => {

    notificationList.forEach((notification) => {
        let unread = notification.querySelector("h2").lastElementChild;
        if (unread.classList.contains("unread_mark") && notification.classList.contains("unread")) {
            notification.classList.remove("unread");
            unread.remove();
        }
    })

    notificationCount = 0;
    notificationCountElement.innerText = notificationCount;
}

window.onload = loadNotifications;

clearButton.onclick = () => {
    setReadAllNotifications();
    notificationCountElement.remove();
}

notificationList.forEach((notification) => {
    notification.onclick = () => {
        setReadNotification(notification);
        if (notificationCount == 0) {
            notificationCountElement.remove();
        }
    }
})