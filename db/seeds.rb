require 'json'
jokes = JSON.parse(File.read('/home/jamesng/phase-5-project/db/jokes.json'))


puts "Seeding jokes..."

Joke.destroy_all

jokes["jokes"].map do |joke| 
    Joke.create(joke)
end

puts "Done."