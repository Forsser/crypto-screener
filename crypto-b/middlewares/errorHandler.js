const errorHandler = (err, req, res, next) => {
  // Логування помилки в консоль
  console.error(err.stack);

  // Визначаємо статус помилки, якщо він не визначений, ставимо 500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Відправка відповіді з помилкою
  res.status(statusCode).json({
    message: err.message,
    // Логіка безпеки, перевірка середовища  stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export default errorHandler;
