export function formatDate(timestamp) {
  const d = new Date(timestamp);
  const time = d.toLocaleTimeString("en-US");
  return time.substr(0, 5) + time.slice(-2) + " | " + d.toLocaleDateString();
}

export function formatQuestion(question, user) {
  const { id, optionOne, optionTwo, timestamp } = question;
  const { avatarURL, name, handle } = user;

  return {
    id,
    name,
    handle,
    timestamp,
    optionOne,
    optionTwo,
    avatar: avatarURL
  };
}
