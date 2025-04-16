class AddComputedColumnToStudents < ActiveRecord::Migration[7.0]
  def change
    add_column :students, :total_group_a_score, :virtual,
      type: :decimal,
      as: 'COALESCE(math, 0) + COALESCE(physics, 0) + COALESCE(chemistry, 0)',
      stored: true

    add_index :students, :total_group_a_score, order: { total_group_a_score: :desc }
  end
end
