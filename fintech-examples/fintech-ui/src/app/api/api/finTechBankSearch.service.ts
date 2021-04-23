/**
 * Open Banking Gateway FinTech Example API
 * This is a sample API that shows how to develop FinTech use cases that invoke banking APIs.  #### User Agent and Cookies This Api assumes * that the PsuUserAgent (hosting the FinTechUI) is a modern web browser that stores httpOnly cookies sent with the redirect under the given domain and path as defined by [RFC 6265](https://tools.ietf.org/html/rfc6265). * that any other PsuUserAgent like a native mobile or a desktop application can simulate this same behavior of a modern browser with respect to Cookies.  #### SessionCookies and XSRF After a PSU is authenticated with the FinTech environment (either through the simple login interface defined here, or through an identity provider), the FinTechApi will establish a session with the FinTechUI. This is done by the mean of using a cookie called SessionCookie. This SessionCookie is protected by a corresponding xsrfToken. The response that sets a SessionCookie also carries a corresponding xsrfToken in the response header named \"X-XSRF-TOKEN\".  It is the responsibility of the FinTechUI to : * parse and store this xsrfToken so that a refresh of a browser window can work. This shall be done using user agent capabilities. A web browser application might decide to store the xsrfToken in the browser localStorage, as the cookie we set are all considered persistent. * make sure that each subsequent request that is carrying the SessionCookie also carries the corresponding xsrfToken as header field (see the request path). * remove this xsrfToken from the localStorage when the corresponding SessionCookie is deleted by a server response (setting cookie value to null).  The main difference between an xsrfToken and a SessionCookie is that the sessionCookie is automatically sent with each matching request. The xsrfToken must be explicitely read and sent by application.  #### API- vs. UI-Redirection For simplicity, this Framework is designed to redirect to FinTechUI not to FinTechApi.  #### Explicite vs. Implicite Redirection We define an \"Implicite redirection\" a case where a web browser react to 30X reponse and automatically redirects to the attached endpoint. We define an \"Explicite Redirection\" as a case where the UI-Application reacts to a 20X response, explicitely parses the attached __Location__ header an uses it to reload the new page in the browser window (or start the new UI-Application in case of native apps).  This framework advocates for explicite redirection passing a __20X__ response to the FinTechUI toghether with the __Location__ parameter.  Processing a response that initiates a redirect, the FinTechUI makes sure following happens, * that the exisitng __SessionCookie__ is deleted, as the user will not have a chance for an explicite logout, * that the corresponding xsrfToken is deleted from the local storage, * that a RedirectCookie set is stored (in case UI is not a web browser), so the user can be authenticated against it when sent back to the FinTechUI. The expiration of the RedirectCookie shall be set to the expected duration of the redirect, * that the corresponding xsrfToken is stored in the local storage (under the same cookie path as the RedirectCookie)  #### Redirecting to the ConsentAuthorisationApi For a redirection to the ConsentAuthorisationApi, a generated AUTH-ID is added to the cookie path and used to distinguish authorization processes from each order. This information (AUTH-ID) must be contained in the back redirect url sent to the ConsentAuthorisationApi in the back channel, so that the FinTechUI can invoke the correct code2Token endpoint when activated. 
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent, HttpParameterCodec }       from '@angular/common/http';
import { CustomHttpParameterCodec }                          from '../encoder';
import { Observable }                                        from 'rxjs';

import { ErrorResponse } from '../model/models';
import { InlineResponse2001 } from '../model/models';
import { InlineResponse2002 } from '../model/models';
import { PsuMessage } from '../model/models';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';



@Injectable({
  providedIn: 'root'
})
export class FinTechBankSearchService {

    protected basePath = 'http://localhost';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public encoder: HttpParameterCodec;

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }



    private addToHttpParams(httpParams: HttpParams, value: any, key?: string): HttpParams {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        } else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    }

    private addToHttpParamsRecursive(httpParams: HttpParams, value?: any, key?: string): HttpParams {
        if (value == null) {
            return httpParams;
        }

        if (typeof value === "object") {
            if (Array.isArray(value)) {
                (value as any[]).forEach( elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
            } else if (value instanceof Date) {
                if (key != null) {
                    httpParams = httpParams.append(key,
                        (value as Date).toISOString().substr(0, 10));
                } else {
                   throw Error("key may not be null if value is Date");
                }
            } else {
                Object.keys(value).forEach( k => httpParams = this.addToHttpParamsRecursive(
                    httpParams, value[k], key != null ? `${key}.${k}` : k));
            }
        } else if (key != null) {
            httpParams = httpParams.append(key, value);
        } else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    }

    /**
     * Request the profile of the bank identified with id (bankId).
     * Request the profile of the bank identified with id (bankId).
     * @param xRequestID Unique ID that identifies this request through common workflow. Must be contained in HTTP Response as well. 
     * @param xXSRFTOKEN XSRF parameter used to validate a SessionCookie or RedirectCookie. 
     * @param bankId Identifier of the bank to be loaded.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public bankProfileGET(xRequestID: string, xXSRFTOKEN: string, bankId: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<InlineResponse2002>;
    public bankProfileGET(xRequestID: string, xXSRFTOKEN: string, bankId: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<InlineResponse2002>>;
    public bankProfileGET(xRequestID: string, xXSRFTOKEN: string, bankId: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<InlineResponse2002>>;
    public bankProfileGET(xRequestID: string, xXSRFTOKEN: string, bankId: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {
        if (xRequestID === null || xRequestID === undefined) {
            throw new Error('Required parameter xRequestID was null or undefined when calling bankProfileGET.');
        }
        if (xXSRFTOKEN === null || xXSRFTOKEN === undefined) {
            throw new Error('Required parameter xXSRFTOKEN was null or undefined when calling bankProfileGET.');
        }
        if (bankId === null || bankId === undefined) {
            throw new Error('Required parameter bankId was null or undefined when calling bankProfileGET.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (bankId !== undefined && bankId !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>bankId, 'bankId');
        }

        let headers = this.defaultHeaders;
        if (xRequestID !== undefined && xRequestID !== null) {
            headers = headers.set('X-Request-ID', String(xRequestID));
        }
        if (xXSRFTOKEN !== undefined && xXSRFTOKEN !== null) {
            headers = headers.set('X-XSRF-TOKEN', String(xXSRFTOKEN));
        }

        // authentication (sessionCookie) required
        if (this.configuration.apiKeys) {
            const key: string | undefined = this.configuration.apiKeys["sessionCookie"] || this.configuration.apiKeys["sessionCookie"];
            if (key) {
            }
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.get<InlineResponse2002>(`${this.configuration.basePath}/v1/search/bankProfile`,
            {
                params: queryParameters,
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Issues an incremental bank search request to the FinTechApi.
     * Issues an incremental bank search request to the FinTechApi.
     * @param xRequestID Unique ID that identifies this request through common workflow. Must be contained in HTTP Response as well. 
     * @param xXSRFTOKEN XSRF parameter used to validate a SessionCookie or RedirectCookie. 
     * @param keyword 
     * @param start 
     * @param max 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public bankSearchGET(xRequestID: string, xXSRFTOKEN: string, keyword: string, start?: number, max?: number, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<InlineResponse2001>;
    public bankSearchGET(xRequestID: string, xXSRFTOKEN: string, keyword: string, start?: number, max?: number, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<InlineResponse2001>>;
    public bankSearchGET(xRequestID: string, xXSRFTOKEN: string, keyword: string, start?: number, max?: number, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<InlineResponse2001>>;
    public bankSearchGET(xRequestID: string, xXSRFTOKEN: string, keyword: string, start?: number, max?: number, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {
        if (xRequestID === null || xRequestID === undefined) {
            throw new Error('Required parameter xRequestID was null or undefined when calling bankSearchGET.');
        }
        if (xXSRFTOKEN === null || xXSRFTOKEN === undefined) {
            throw new Error('Required parameter xXSRFTOKEN was null or undefined when calling bankSearchGET.');
        }
        if (keyword === null || keyword === undefined) {
            throw new Error('Required parameter keyword was null or undefined when calling bankSearchGET.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (keyword !== undefined && keyword !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>keyword, 'keyword');
        }
        if (start !== undefined && start !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>start, 'start');
        }
        if (max !== undefined && max !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>max, 'max');
        }

        let headers = this.defaultHeaders;
        if (xRequestID !== undefined && xRequestID !== null) {
            headers = headers.set('X-Request-ID', String(xRequestID));
        }
        if (xXSRFTOKEN !== undefined && xXSRFTOKEN !== null) {
            headers = headers.set('X-XSRF-TOKEN', String(xXSRFTOKEN));
        }

        // authentication (sessionCookie) required
        if (this.configuration.apiKeys) {
            const key: string | undefined = this.configuration.apiKeys["sessionCookie"] || this.configuration.apiKeys["sessionCookie"];
            if (key) {
            }
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.get<InlineResponse2001>(`${this.configuration.basePath}/v1/search/bankSearch`,
            {
                params: queryParameters,
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
