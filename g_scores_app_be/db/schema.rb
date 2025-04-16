# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_04_16_140511) do
  create_table "students", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "registration_number"
    t.float "math"
    t.float "physics"
    t.float "chemistry"
    t.float "biology"
    t.float "history"
    t.float "geography"
    t.float "civic_education"
    t.float "literature"
    t.float "foreign_language"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.virtual "total_group_a_score", type: :decimal, precision: 10, as: "((coalesce(`math`,0) + coalesce(`physics`,0)) + coalesce(`chemistry`,0))", stored: true
    t.index ["total_group_a_score"], name: "index_students_on_total_group_a_score", order: :desc
  end
end
