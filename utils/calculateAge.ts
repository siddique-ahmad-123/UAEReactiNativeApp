const calculateAge = (date: Date | null,) => {
    if (!date) return;

    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();

    // adjust if birthday hasn't occurred yet this year
    const hasHadBirthday =
      today.getMonth() > date.getMonth() ||
      (today.getMonth() === date.getMonth() &&
        today.getDate() >= date.getDate());

    if (!hasHadBirthday) {
      age--;
    }

    return age.toString();
  };
export default calculateAge;