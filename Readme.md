## Client Routes

|   	    |   URI path	                |  Description  	 |   PROTECTED  |
| --------- | ----------------------------- | -----------------  |--------- |
|  	        | `/`       	                |  Index page   	 |   	   |
|        	| `/registro`                	|  User Registration |         |   	
|         	| `/iniciar-sesion`             |  Log In 	         |         |   	
| 	        | `/cerrar-sesion`	            |  Log Out           |   ✅    |   	 
|       	| `/perfil`         	        |  User Profile 	 |   ✅    |  
|           | `/perfil/editar`             	|  Edit User Profile |   ✅    |  	
|	        | `/lista`	                    |  Rent list 	     |   	   | 
|	        | `/anuncio/crear`         	    |  Create Rent	     |   ✅    |	   
|	        | `/detalles/:rent_id`  	    |  Rent Details 	 |   	   |   
| 	        | `/comentario/crear`	        |  Create Comment  	 |   ✅ 	  |   	  	
|	        | `/*`	                        |  Not Found	     |   	   |


## Server Routes


|   HTTP Method	|   URI path	                |  Description 	     |   JSON	|
| -----------   | ----------------------------- | ------------------ |--------- |	  	
| POST          | `/user/create`            	|  Create user       |      	|
| DELETE	    | `/user/delete`	            |  Delete user	     |       	| 
| PUT	        | `/user/profile/edit`	        |  Edit user profile |   	    |     
| GET	        | `/user/:user_id`          	|  User details	     |    ✅   | 
| POST	        | `/login`	                    |  User login	     |         |
| GET	        | `/getAllRents`   	            |  Rent list         |    ✅   |   
| GET     	    | `/rent/:rent_id`	            |  Rent details	     |    ✅   |
| PUT     	    | `/saveRent`   	            |  Save rent	     |     	    | 
| PUT           | `/rent/edit/`	                |  Rent edit	     |          |    
| DELETE        | `/rent/delete/`	            |  Rent delete	     |          |  
| POST        	| `/rent/create`	            |  Rent form 	     |   	    | 
| POST	        | `/post/create`	            |  Post form 	     |      	| 
| PUT	        | `/post/edit`	                |  Post form 	     |      	| 
| DELETE	    | `/post/delete`	            |  Delete Post       |      	| 
 

  	



