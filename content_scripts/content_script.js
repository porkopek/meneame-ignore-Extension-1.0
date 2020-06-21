chrome.storage.sync.get('ignoredUsers', (result) => {
  let ignoredUsers = result.ignoredUsers || [];
  renderButtons();
  attachListeners(ignoredUsers);
  applyUserStyle(ignoredUsers);
}) || [];

const applyUserStyle = (ignoredUsers) => {
  [...document.querySelectorAll('.comment')].map((e) => {
    const isIgnored = ignoredUsers.some((user) =>
      e.innerText.toLowerCase().includes(user.toLowerCase())
    );
    e.style.display = isIgnored ? 'none' : 'initial';
  });
};

const ignoreUser = (user, ignoredUsers) => {
  if (!ignoredUsers.includes(user)) {
    ignoredUsers.push(user);
    chrome.storage.sync.set({ ignoredUsers: ignoredUsers });
    applyUserStyle(ignoredUsers);
  }
};

//add button to html
const renderButtons = () => {
  [...document.querySelectorAll('li>.comment')].map((e) => {
    let footer = e.querySelector('.comment-footer');
    footer.style.height = 'unset';
    let userName = e.querySelector('.username').innerText;
    footer.innerHTML += ` <button title="bloqueame" class="ignore-user-button" data-user="${userName}" >👎</button> `;
  });
};

//listeners for each ignore user button
const attachListeners = (ignoredUsers) => {
  [...document.querySelectorAll('.ignore-user-button')].forEach((b) =>
    b.addEventListener('click', (e) => {
      ignoreUser(e.target.dataset.user, ignoredUsers);
    })
  );
};

//listen for changes in popup
chrome.storage.onChanged.addListener((changes) => {
  const ignoredUsers = changes.ignoredUsers.newValue;
  applyUserStyle(ignoredUsers);
  attachListeners(ignoredUsers);
});
