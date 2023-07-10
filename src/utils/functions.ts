import * as ejs from 'ejs';

export async function getTemplateString(
  pathfile: string,
  options: any,
): Promise<any> {
  return new Promise((resolve, reject) => {
    ejs.renderFile(pathfile, options, (error, string) => {
      if (error) {
        return reject(error);
      }

      resolve(string);
    });
  });
}

export function generateRandomCode(length: number): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }

  return code;
}
