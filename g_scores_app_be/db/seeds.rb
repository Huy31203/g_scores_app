require 'csv'

INSERT_BATCH=10_000

csv_path = Rails.root.join('dataset', 'diem_thi_thpt_2024.csv')
students = []

CSV.foreach(csv_path, headers: true, encoding: 'UTF-8') do |row|
  students << Student.new(
    registration_number: row['sbd'],
    math: row['toan']&.gsub(',', '.')&.to_f,
    literature: row['ngu_van']&.gsub(',', '.')&.to_f,
    foreign_language: row['ngoai_ngu']&.gsub(',', '.')&.to_f,
    physics: row['vat_li']&.gsub(',', '.')&.to_f,
    chemistry: row['hoa_hoc']&.gsub(',', '.')&.to_f,
    biology: row['sinh_hoc']&.gsub(',', '.')&.to_f,
    history: row['lich_su']&.gsub(',', '.')&.to_f,
    geography: row['dia_li']&.gsub(',', '.')&.to_f,
    civic_education: row['gdcd']&.gsub(',', '.')&.to_f
  )

  if students.size >= INSERT_BATCH
    Student.import students
    students = [] # reset
  end
end

# Insert remaining rows
Student.import students if students.any?

puts "✅ Seeded student data successfully!"
