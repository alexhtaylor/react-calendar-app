# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
Event.create!(
  title: "Example Event",
  start: DateTime.now,
  end: DateTime.now + 2.hours
)

Event.create!(
  title: "Mega Rave",
  start: DateTime.now + 2.days,
  end: DateTime.now + 2.days + 2.hours
)
