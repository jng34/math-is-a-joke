require 'json'
jokes = JSON.parse(File.read('/home/jamesng/phase-5-project/db/jokes.json'))


User.destroy_all
Joke.destroy_all

puts "Seeding admin..."

User.create(username: 'admin', email: 'njames15@gmail.com', profile_img: 'https://cdn.pixabay.com/photo/2020/12/27/20/24/smile-5865208_1280.png', password: 'admin123', password_confirmation: 'admin123')

puts "Seeding jokes..."

jokes["jokes"].map do |joke| 
    Joke.create(joke)
end

puts "Done."