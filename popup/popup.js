chrome.storage.sync.get('ignoredUsers', (result) => {
  let ignoredUsers = result.ignoredUsers || [];
  renderIgnoredUsersList(ignoredUsers);
  attachRemoveIgnoredUserListeners(ignoredUsers);
});

const renderIgnoredUsersList = (ignoredUsers) => {
  const renderElement = document.querySelector('#ignoredUsersList');

  if (ignoredUsers.length === 0) {
    renderElement.innerHTML = 'Todo el mundo te cae bien';
    return;
  }

  const usersList = ignoredUsers.map((u) => {
    return `<li id="${u}-user">
             <span>
             ${u} 
             </span> 
              <button id="${u}-button" 
                      class="remove-ignored-user-button"
                      data-user=${u}
                      title="desbloquéame"
              >
              👍
              </button>
            </li>`;
  });

  renderElement.innerHTML = usersList.join('');
};

const attachRemoveIgnoredUserListeners = (ignoredUsers) => {
  ignoredUsers.map((u) => {
    const el = document.querySelector(`#${u}-button`);
    el.ignoredUsers = ignoredUsers;
    console.log(el);

    el.addEventListener('click', removeIgnoredUser);
  });
};

const removeIgnoredUser = (e) => {
  let ignoredUsers = e.target.ignoredUsers.filter((u) => u !== e.target.dataset.user);

  chrome.storage.sync.set({ ignoredUsers: ignoredUsers }, (_) => {
    renderIgnoredUsersList(ignoredUsers);
    attachRemoveIgnoredUserListeners(ignoredUsers);
  });
};
