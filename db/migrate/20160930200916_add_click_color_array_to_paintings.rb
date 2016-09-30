class AddClickColorArrayToPaintings < ActiveRecord::Migration[5.0]
  def change
    add_column :paintings, :clickColorArray, :string, array: true
  end
end
