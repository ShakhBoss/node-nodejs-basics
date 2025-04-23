import{access,writeFile,readFile,readdir,mkdir,constants} from 'node:fs/promises';
import { dirname,join } from 'node:path';
import { fileURLToPath } from 'node:url';
const copy = async () => {
    const fileName=fileURLToPath(import.meta.url);
    const __dirname=dirname(fileName);
    const sourceFile=join(__dirname,'files');
    const copyFile=join(__dirname,'files_copy');

    try {
        await access(sourceFile,constants.F_OK);
        await access(copyFile,constants.F_OK);
        throw new Error("FS operation failed");

    } catch (error) {
        if(error.code==="ENOENT"){
            try {
                await mkdir(copyFile);
            const files=await readdir(sourceFile);

            for(const file of files){
                const srcFile=join(sourceFile,file);
                const distFile=join(copyFile,file);

                const content=await readFile(srcFile);
                await writeFile(distFile, content);
            }
            } catch (error) {
                throw new Error("FS operation failed"); 
            }
        }else{
            throw new Error("FS operation failed");
        }   
    }
}
await copy();
