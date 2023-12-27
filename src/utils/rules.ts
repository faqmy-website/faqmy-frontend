const rules = {
  required(v: string) {
    return !!v || "Field is required";
  },
  email(v: string) {
    if (/.+@.+\..+/.test(v)) return true;
    return "E-mail must be valid.";
  },
  link(v: string) {
    const re =
      /(http(s)?:\/\/.)(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/g;
    if (re.test(v)) return true;
    return "Url must be valid.";
  },
  maxSize10MB(value: File[]) {
    return (
      !value ||
      !value.length ||
      value[0].size < 10 * 1000 * 1000 ||
      "File size should be less than 10 MB!"
    );
  },
};

export default rules;
