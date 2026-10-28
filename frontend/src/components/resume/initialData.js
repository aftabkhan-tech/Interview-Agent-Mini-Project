const initialData = {
  // Step 1 - Personal Info & Photo
  name: "",
  title: "",
  photo: "", // URL or base64 image for Canva-style profile photo
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  github: "",

  // Step 2 - Summary
  summary: "",

  // Step 3 - Skills & Languages
  skills: "",
  languages: "", // Comma-separated (e.g. English, Hindi, Spanish)
  awards: "", // Comma-separated or bullet list of awards/certifications

  // Step 4 - Experience (array of objects)
  experience: [],

  // Step 5 - Projects / References (array of objects)
  projects: [],

  // Step 6 - Education (array of objects)
  education: [],
};

export default initialData;