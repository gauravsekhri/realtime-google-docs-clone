import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Socket } from 'socket.io';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserdocsService } from '../userdocs/userdocs.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class DoceventsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private UserdocsService: UserdocsService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: any) {
    // Handle connection event
  }

  handleDisconnect(client: any) {
    // Handle disconnection event
  }

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    console.log('event');
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'events', data: item })),
    );
  }

  @SubscribeMessage('doc-send-changes')
  handleMessage(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    // console.log('changes', data);
    // this.server.emit('doc-rec-changes', data); // Broadcast the message to all connected clients
    this.server.to(data?.docId).emit('doc-rec-changes', data);
  }

  @SubscribeMessage('get-doc')
  async handleDBdoc(
    @MessageBody() docId: string,
    @ConnectedSocket() client: Socket,
  ) {
    let reqDocument: any = await this.UserdocsService.getDocById(docId);

    if (!reqDocument) {
      reqDocument = await this.UserdocsService.createDocWithId(docId);
    }

    // const data = '';
    console.log('docId', reqDocument.docId);
    client.join(docId);
    // this.server.socketsJoin([docId]);
    this.server.emit('load-doc', reqDocument.content);

    // this.server.on('doc-send-changes', (delta: any) => {
    //   console.log(delta);
    //   this.server.to(docId).emit('doc-rec-changes', data);
    // });
  }

  @SubscribeMessage('save-doc')
  async handleDocSave(
    @MessageBody() payload: any,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      await this.UserdocsService.updateDocWithId(
        payload.docId,
        payload.content,
      );
    } catch (err: any) {
      console.log('err while saving', err);
    }
  }
}

// import {
//   MessageBody,
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer,
//   WsResponse,
// } from '@nestjs/websockets';
// import { from, Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { Server } from 'socket.io';

// @WebSocketGateway({
//   cors: {
//     origin: '*',
//   },
// })
// export class DoceventsGateway {
//   @WebSocketServer()
//   server: Server;

//   @SubscribeMessage('events')
//   findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
//     console.log('event');
//     return from([1, 2, 3]).pipe(
//       map((item) => ({ event: 'events', data: item })),
//     );
//   }

//   @SubscribeMessage('identity')
//   async identity(@MessageBody() data: number): Promise<number> {
//     return data;
//   }
// }
