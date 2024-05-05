export function validateName(name) {
  const nameRegex = /^[a-zA-Zа-яА-ЯїЇєЄіІёЁ\s]{2,30}$/;
  return nameRegex.test(name);
}
