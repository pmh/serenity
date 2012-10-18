# +===============================================+
# | Tasks                                         |
# +===============================================+

desc "Start the development server (use this if your using linux or osx)"
task :run do
  Process.wait(Process.spawn("node", "utils/build.js", "dev"))
  Process.wait(Process.spawn("node", "utils/server.js"))
end

desc "Generate documentation"
task :docs do
  generate_documentation
  generate_css_styleguide
end

desc "Build project"
task :build do
  clean

  compile_js
  copy_assets    :images, :vendor, :index

  display "Build Complete"
end


def display(message)
  puts "-----------------------------"
  puts "  > #{message}"
  puts "-----------------------------"
end

def clean
  display "Cleaning Up"
  puts "rm -rf build/"
  FileUtils.rm_rf "build/"
  puts "mkdir -p build/js"
  FileUtils.mkdir_p "build/js"
  puts "mkdir -p build/css"
  FileUtils.mkdir_p "build/css"
  puts "mkdir -p build/img"
  FileUtils.mkdir_p "build/img"
end

def generate_documentation
  display "Generating Documentation"
  require 'find'
  paths = []
  Dir.foreach('app/js/src/') do |folder|
    unless folder =~ /vendor|\.+/
      Find.find("app/js/src/#{folder}") do |path|
        puts path if path =~ /\.js|\.coffee/
        paths << path if path =~ /\.js|\.coffee/
      end
    end
  end
  paths.unshift('app/js/src/main.' + (File.exists?('app/js/src/main.js') ? 'js' : 'coffee'))
  `utils/node_modules/docco/bin/docco #{paths.join(" ")}`
end

def generate_css_styleguide
  display "Generating CSS Styleguide"
  system("kss-node app/scss/ styleguide -c app/css/screen.css -l styleguide.less")
  FileUtils.cp_r "app/img", "styleguide/"
end

def compile_js
  Process.wait(Process.spawn("node", "utils/build.js", "prod"))
end

def copy_assets(*args)
  args.each { |arg| send "copy_#{arg}" }
end

def copy_images
  display "Copying Images"
  puts "cp -R app/img build/"
  FileUtils.cp_r "app/img", "build/"
end


def copy_vendor
  display "Copying Vendor"
  puts "cp -R app/js/src/vendor build/"
  FileUtils.mkdir_p "build/js/src"
  FileUtils.cp_r "app/js/src/vendor", "build/js/src/"
end

def copy_index
  display "Copying Index"
  puts "cp -R app/index.html build/"
  FileUtils.cp_r "app/index.html", "build/"
end

begin
  require 'jasmine'
  load 'jasmine/tasks/jasmine.rake'
rescue LoadError
  task :jasmine do
    abort "Jasmine is not available. In order to run jasmine, you must: (sudo) gem install jasmine"
  end
end
