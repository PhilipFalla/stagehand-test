## Stagehand Test

#### Instalation Guide

We will be using Deno runtime to access a JS jupyter kernel since iJavascript Kernel is staunchly refusing to work.

Follow the following to install 

`cd ~`
`curl -fsSL https://deno.land/x/install/install.sh | sh`
Select "y" when prompted to add deno to path. 

If you select "n" then run the following:
```
export DENO_INSTALL="$HOME/.deno"
export PATH="$DENO_INSTALL/bin:$PATH"
```

Ensure you have Jupyter installed: 
`pip3 install jupyterlab`

Install the Deno Jupyter Kernel
`deno jupyter --unstable --install`
(If this command fails, it should let you know what to change.)

Now install other project dependencies using: 
`npm install`


### Running the kernel and stagehand-test

If using jupyter directly, you can start the server using: 
`jupyter notebook`
This will create a local server and give you the connection to see the notebook in your browser. 

However, the recommended approach is to use Visual Studio Code and their support for notebooks. 
If you haven't, download VS Code and install the Jupyter extension. 

You should now be able to open and inspect the contents of the notebooks. In the top right corner of the file you should see "Select Kernel", click this, select "Jupyter Kernel" and finally "Deno". 


---
Once you have the kernel installed and a notebook running please execute the following command:
`source ./launch-browser.sh`

If you haven't downloaded brave, this should prompt you to do so. Execute the same command after installation. 

### Test stagehand! 

Now you should be ready to test stagehand! 
The stagehand-test.ipynb file should contain the right import sequence, as well as an example of how to run your commands through the notebook. 

You can control the browser through stagehand commands or directly as a regular browser. This should allow easy testing of different prompts and workflows without needing to restart a full process each time.