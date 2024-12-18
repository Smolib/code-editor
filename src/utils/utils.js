export const serverResponses = {
  success: "success",
  error: "error",
};

export async function post(data) {
  // обращение к не настоящему серверу дает ошибку 404 в консоли, fetch можно убрать, но он был в задании
  await fetch("/api/execute", { method: "POST", body: JSON.stringify(data) });

  //имитация общения с сервером через JSON, выносим логику сервера в отдельную функцию
  const result = await postServerResponsMock(JSON.stringify(data));
  return JSON.parse(result);
}

async function postServerResponsMock(data) {
  data = JSON.parse(data);
  // имитация задержки ответа сервера
  await new Promise((res) => setTimeout(res, 2000));

  // рандомный выбор ответа от сервера
  const isSuccess = Math.random() > 0.5;
  let response;
  if (isSuccess) {
    response = {
      status: serverResponses.success,
      output: data.code,
    };
  } else {
    response = {
      status: serverResponses.error,
      error: "SyntaxError: Unexpected token"
    };
  }
  return JSON.stringify(response);
}
