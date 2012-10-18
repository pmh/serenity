* Installation:

** Windows
1. Download and install Ruby(>=1.9.3p194) from: http://rubyinstaller.org/downloads/

2. Download DevKit from http://rubyinstaller.org/downloads/, located further down on the page, and extract it somwhere.

3. Open the start menu and search for "command" and select "Start Command Prompt with Ruby" then navigate to the extracted 
   DevKit folder and execute the following to commands (sans the > character):
  > ruby dk.rb init
  > ruby dk.rb install

4. Close the previous command prompt and open a new one like before and then execute the following commands 
   sequentially (sans the > character):
  > gem update --system
  > gem install bundler --no-ri --no-rdoc
  > gem install rake --no-ri --no-rdoc

5. Download and install NodeJS from http://nodejs.org/#download

6. Download and install the windows version of QT 4.8.x from: http://qt-project.org/downloads and add it's bin/ folder to your path

7. Download phantomjs from http://phantomjs.org/download.html, extract it somewhere and add it to your path.

8. Checkout the html client from the svn repositority

9. (Optional) Download the latest version of ansicon from: https://github.com/adoxa/ansicon/downloads, extract the folder. 
   Inside of it you will find x64 and x32 folders, add the appropriate one to your path.

10. Close any open prompts and open a new ruby enabled command prompt (see step 3) and navigate to the project folder and execute the following command:
  > bundle install


** OSX
1. Open a terminal and execute the following (note the first command is only needed if homebrew is not already present):
  > /usr/bin/ruby -e "$(/usr/bin/curl -fsSL https://raw.github.com/mxcl/homebrew/master/Library/Contributions/install_homebrew.rb)"
  > brew install node
  > brew install qt
  > brew install ruby
  > brew install phantomjs
  > gem install bundler

2. Checkout the html client from the svn repositority

3. Open a terminal and navigate to the project then execute:
  > bundle install


* Usage (Windows)

1. Close any open prompts and open a ruby enabled command prompt (see Installation: Step 3), navigate to the html client project and run:
  > rake jasmine

2. Open another ruby enabled prompt (see Installation: Step 3) but keep the previous running, and run:
    > rake run

* Usage (OSX)

1. Open a new terminal window and run:
  > rake run