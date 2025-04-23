import{writeFile,access,constants}from 'node:fs/promises';
import { join,dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const create = async () => {
  const filName=fileURLToPath(import.meta.url);
  const __dirname=dirname(filName);
  const filePath=join(__dirname,"files",'fresh.txt');
   try {
    await access(filePath,constants.F_OK)
    throw new Error("FS operation failed");
    
   } catch (error) {
    if(error.code==="ENOENT"){
        await writeFile(filePath,'I am fresh and young')
    }else{
        throw new Error('FS operation failed');
    }
   }
};

await create();
