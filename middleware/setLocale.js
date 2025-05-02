const setLocale = (req, res, next) => {
  const lang = req.lang || 'en'; // Fallback to 'en' if lang is not set
  console.log(lang)
  req.setLocale(lang);  // This will set the locale for i18n
  next();
  };

  
  module.exports = setLocale;