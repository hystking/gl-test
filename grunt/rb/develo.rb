require "sass"

module Develo
  def fileList(dir,isDir = true,extname = false)
    array = []
    dirs = Dir.glob(dir.value)
    dirs.each_with_index do |li,i|
      if isDir.to_s == "true" then
        file = li
      else
        if extname == false
          file = File.basename(li)
        else 
          file = File.basename(li,extname.value.to_s)
        end
      end
      array[i] = Sass::Script::String.new("#{file}")
    end
    Sass::Script::List.new(array,',')
  end
end

module Sass::Script::Functions
  include Develo
end
