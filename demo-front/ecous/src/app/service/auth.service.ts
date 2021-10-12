import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AlertasService } from './alerta.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /* GERA UMA URL DINAMICA TRAZENDO OS DADOS DO VALOR GLOBAL */
  public endereco = environment.server + environment.port;

  autorizacao = {
    //headers: new HttpHeaders().set('Authorization', environment.token)
    headers: new HttpHeaders().set('Authorization', localStorage.getItem('token') || '')

  }

  constructor(

    private http: HttpClient,
    private router: Router,
    private alertas: AlertasService
  
  ) { }

  entrar (userLogin: UsuarioLogin): Observable<UsuarioLogin>{
    return this.http.put<UsuarioLogin>('https://ecousteste.herokuapp.com/usuarios/login', userLogin)

  }

  cadastrar(user: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>('https://ecousteste.herokuapp.com/usuarios/novousuario', user)

  }

  getAllUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>('https://ecousteste.herokuapp.com/usuarios')
  }

  /* PESQUISA UM USUARIO POR ID */
  findByIdCliente(id: number): Observable<Usuario> {

    return this.http.get<Usuario>(`${this.endereco}/usuarios/idusuario/${id}`, this.autorizacao);
  }

  


  fomenu(){
    let ok = false
    if(this.router.url.includes('/home') || this.router.url.includes('/contato') || this.router.url.includes('/quemsomos') || this.router.url.includes('/produtos') || this.router.url.includes('/produto/')|| this.router.url.includes('/perfil') ){
      ok = true
    }
    return ok
  }


}
