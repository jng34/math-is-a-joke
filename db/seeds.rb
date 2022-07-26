require 'json'
#file to run seed data locally
# jokes = JSON.parse(File.read('/phase-5-project/jokes.json'))

#file for heroku run rails db:seed
jokes = JSON.parse(File.read('/app/jokes.json'))

User.destroy_all
Joke.destroy_all

puts "Seeding admin..."

User.create(username: 'admin', email: 'njames15@gmail.com', profile_img: 'https://cdn.pixabay.com/photo/2020/12/27/20/24/smile-5865208_1280.png', password: '!Admin321?', password_confirmation: '!Admin321?')

puts "Seeding jokes..."

jokes["jokes"].map do |joke| 
    Joke.create(joke)
end

puts "Done."