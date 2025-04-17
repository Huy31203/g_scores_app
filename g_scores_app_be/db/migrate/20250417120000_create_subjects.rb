class CreateSubjects < ActiveRecord::Migration[8.0]
  def change
    create_table :subjects do |t|
      t.string :name, null: false
      t.float :score
      t.references :student, null: false, foreign_key: true

      t.timestamps
    end
  end
end
