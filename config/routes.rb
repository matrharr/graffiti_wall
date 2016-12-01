Rails.application.routes.draw do
    
  get 'paintings/today' => 'paintings#today'
  put 'paintings' => 'paintings#save_addition'
  get 'test' => 'paintings#test'

end
